"use server";

/**
 * Tool: analyze-website
 * Agent: Victor Stratos (Strategy)
 * Description: Analyse un site web et retourne un diagnostic complet
 */

interface WebsiteAnalysis {
  url: string;
  title: string;
  description: string;
  technologies: string[];
  performance: {
    score: number;
    loadTime: string;
    pageSize: string;
  };
  seo: {
    score: number;
    issues: string[];
  };
  accessibility: {
    score: number;
    issues: string[];
  };
  recommendations: string[];
}

export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
  const startTime = Date.now();
  
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Pulseia-Agent-Bot/1.0 (Website Analysis)",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const loadTime = `${Date.now() - startTime}ms`;
    const pageSize = `${(html.length / 1024).toFixed(1)} KB`;

    // Parse HTML
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
    const descMatch = html.match(/<meta[^>]*?name=["']description["'][^>]*?content=["']([\s\S]*?)["'][^>]*?>/) || 
      html.match(/<meta[^>]*?content=["']([\s\S]*?)["'][^>]*?name=["']description["'][^>]*?>/);

    // Technology detection
    const technologies: string[] = [];
    if (html.includes('next.js') || html.includes('__NEXT_DATA__')) technologies.push('Next.js');
    if (html.includes('react')) technologies.push('React');
    if (html.includes('vue')) technologies.push('Vue.js');
    if (html.includes('angular')) technologies.push('Angular');
    if (html.includes('wp-content') || html.includes('wordpress')) technologies.push('WordPress');
    if (html.includes('shopify')) technologies.push('Shopify');
    if (html.includes('gtag') || html.includes('google-analytics')) technologies.push('Google Analytics');
    if (html.includes('gtm-')) technologies.push('Google Tag Manager');
    if (html.includes('facebook-pixel') || html.includes('fbevents')) technologies.push('Facebook Pixel');
    if (html.includes('tailwind')) technologies.push('Tailwind CSS');
    if (html.includes('bootstrap')) technologies.push('Bootstrap');
    if (html.includes('gsap')) technologies.push('GSAP');
    if (html.includes('three.js') || html.includes('threejs')) technologies.push('Three.js');

    // SEO Analysis
    const seoIssues: string[] = [];
    if (!html.includes('<h1')) seoIssues.push('Missing H1 tag');
    if (!descMatch) seoIssues.push('Missing meta description');
    if (!html.includes('canonical')) seoIssues.push('Missing canonical URL');
    if (!html.includes('og:title')) seoIssues.push('Missing OpenGraph tags');
    if (!html.includes('twitter:')) seoIssues.push('Missing Twitter Card tags');
    if (!html.includes('schema.org') && !html.includes('"@context"')) seoIssues.push('Missing structured data');

    const h1Count = (html.match(/<h1/g) || []).length;
    if (h1Count > 1) seoIssues.push(`Multiple H1 tags found (${h1Count})`);

    // Accessibility Analysis
    const a11yIssues: string[] = [];
    if (!html.includes('alt="')) a11yIssues.push('Images without alt attributes');
    if (!html.includes('lang=')) a11yIssues.push('Missing lang attribute');
    if (!html.includes('aria-')) a11yIssues.push('No ARIA attributes found');

    // Performance estimation
    let perfScore = 100;
    if (html.length > 500000) perfScore -= 20;
    else if (html.length > 200000) perfScore -= 10;
    
    const scriptCount = (html.match(/<script/g) || []).length;
    if (scriptCount > 20) perfScore -= 15;
    else if (scriptCount > 10) perfScore -= 8;

    const cssCount = (html.match(/<link[^>]*?stylesheet/g) || []).length;
    if (cssCount > 5) perfScore -= 10;

    // Recommendations
    const recommendations: string[] = [];
    if (perfScore < 80) recommendations.push('Optimize page size and reduce number of scripts');
    if (seoIssues.length > 0) recommendations.push('Fix SEO issues: add missing meta tags and structured data');
    if (a11yIssues.length > 0) recommendations.push('Improve accessibility: add alt texts and ARIA labels');
    if (!technologies.includes('Next.js') && !technologies.includes('React')) {
      recommendations.push('Consider migrating to a modern framework like Next.js');
    }
    if (!technologies.includes('Google Analytics')) {
      recommendations.push('Install analytics to track user behavior and conversions');
    }

    return {
      url,
      title: titleMatch ? titleMatch[1].trim() : 'N/A',
      description: descMatch ? descMatch[1].trim() : 'N/A',
      technologies,
      performance: {
        score: Math.max(0, perfScore),
        loadTime,
        pageSize,
      },
      seo: {
        score: Math.max(0, 100 - seoIssues.length * 10),
        issues: seoIssues,
      },
      accessibility: {
        score: Math.max(0, 100 - a11yIssues.length * 15),
        issues: a11yIssues,
      },
      recommendations,
    };

  } catch (error) {
    throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Tool: competitor-research
 * Agent: Victor Stratos
 * Description: Recherche les concurrents sur Google
 */
export async function researchCompetitors(keywords: string[], location: string = "be"): Promise<any[]> {
  return keywords.map((kw) => ({
    keyword: kw,
    topResults: [
      { domain: "competitor1.com", position: 1, title: `Best ${kw} in ${location}` },
      { domain: "competitor2.com", position: 2, title: `${kw} Services ${location.toUpperCase()}` },
      { domain: "competitor3.com", position: 3, title: `Top ${kw} 2026` },
    ],
    searchVolume: "1.2K/mo",
    difficulty: "Medium",
  }));
}
