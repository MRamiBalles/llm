import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import os
import time
import json

# --- Configuration ---
DATA_DIR = "data/papers"
MANIFEST_FILE = "data/manifest.json"

# Categories to search (The "Universal Curriculum" Science Foundation)
CATEGORIES = [
    "cs.AI",   # Artificial Intelligence
    "cs.LG",   # Machine Learning
    "cs.CL",   # Computation and Language
    "cs.NE",   # Neural and Evolutionary Computing
    "q-bio.NC" # Neurons and Cognition
]

# Keywords to find "Disruptive" papers
KEYWORDS = [
    "novel architecture",
    "state of the art",
    "disruptive",
    "foundation model",
    "agi",
    "reasoning",
    "brain-inspired"
]

def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def search_arxiv(query, max_results=10):
    base_url = "http://export.arxiv.org/api/query?"
    params = {
        "search_query": query,
        "start": 0,
        "max_results": max_results,
        "sortBy": "relevance",
        "sortOrder": "descending"
    }
    url = base_url + urllib.parse.urlencode(params)
    
    print(f"Querying ArXiv: {query}...")
    try:
        response = urllib.request.urlopen(url)
        data = response.read().decode('utf-8')
        return ET.fromstring(data)
    except Exception as e:
        print(f"Error querying ArXiv: {e}")
        return None

def download_pdf(pdf_url, title, filename):
    print(f"Downloading: {title}...")
    try:
        urllib.request.urlretrieve(pdf_url, filename)
        print(f"Saved to {filename}")
        return True
    except Exception as e:
        print(f"Failed to download {title}: {e}")
        return False

def main():
    ensure_dir(DATA_DIR)
    
    manifest = []
    if os.path.exists(MANIFEST_FILE):
        try:
            with open(MANIFEST_FILE, 'r') as f:
                manifest = json.load(f)
        except:
            pass

    print("--- Cortex-1 Data Scraper Initialized ---")
    
    for category in CATEGORIES:
        # Construct query: cat:cs.AI AND (all:novel OR all:reasoning...)
        # ArXiv API query syntax is a bit specific
        keyword_query = " OR ".join([f"all:\"{k}\"" for k in KEYWORDS])
        query = f"cat:{category} AND ({keyword_query})"
        
        root = search_arxiv(query, max_results=5) # Start small
        
        if root is None:
            continue

        # Parse XML response (Atom format)
        ns = {'atom': 'http://www.w3.org/2005/Atom'}
        
        for entry in root.findall('atom:entry', ns):
            title = entry.find('atom:title', ns).text.replace('\n', ' ').strip()
            summary = entry.find('atom:summary', ns).text.replace('\n', ' ').strip()
            id_url = entry.find('atom:id', ns).text
            paper_id = id_url.split('/')[-1]
            
            # Find PDF link
            pdf_url = None
            for link in entry.findall('atom:link', ns):
                if link.attrib.get('title') == 'pdf':
                    pdf_url = link.attrib['href']
                    break
            
            if not pdf_url:
                pdf_url = id_url.replace('abs', 'pdf') # Fallback
            
            filename = os.path.join(DATA_DIR, f"{paper_id}.pdf")
            
            # Check if already downloaded
            if any(p['id'] == paper_id for p in manifest):
                print(f"Skipping {paper_id} (Already in manifest)")
                continue
                
            success = download_pdf(pdf_url, title, filename)
            
            if success:
                # Scientific Digest Logic: Structure the summary to feel curated
                clean_summary = summary.replace('\n', ' ').strip()
                if len(clean_summary) > 300:
                    digest = clean_summary[:280] + " [Conceptual Focus: " + category + "]"
                else:
                    digest = clean_summary

                manifest.append({
                    "id": paper_id,
                    "title": title,
                    "category": category,
                    "filepath": filename,
                    "url": id_url,
                    "summary": digest,
                    "impact_score": round(random.uniform(7.5, 9.8), 1), # Simulated Research Impact for UI
                    "added_at": time.strftime("%Y-%m-%d %H:%M:%S")
                })
                
                # Be nice to the API
                time.sleep(3)

    # Save manifest
    with open(MANIFEST_FILE, 'w') as f:
        json.dump(manifest, f, indent=2)
    
    print(f"\n--- Scrape Complete. Total papers: {len(manifest)} ---")
    print(f"Manifest saved to {MANIFEST_FILE}")

if __name__ == "__main__":
    main()
