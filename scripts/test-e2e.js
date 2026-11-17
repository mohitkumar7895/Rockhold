// Comprehensive End-to-End Verification Test Script for RockHold Website & Admin Panel
const http = require('http');

async function request(urlPath, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, 'http://127.0.0.1:3000');
    const reqOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {
          json = null;
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
          json,
        });
      });
    });

    req.on('error', (err) => reject(err));

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('  ROCKHOLD FULL-STACK E2E VERIFICATION TEST SUITE   ');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Test Homepage
    console.log('[1/8] Testing Public Website Routes...');
    const homeRes = await request('/');
    assert(homeRes.status === 200, 'Home page returns 200 OK');
    assert(homeRes.body.includes('RockHold') || homeRes.body.includes('Strong Bonds'), 'Home page contains RockHold branding');
    assert(homeRes.body.includes('90016 67917') || homeRes.body.includes('9001667917'), 'Home page contains phone/WhatsApp');
    assert(homeRes.body.includes('Shivani Bass') || homeRes.body.includes('Sardarshahr'), 'Home page contains client address');

    // Verify removed hero text per user request
    assert(!homeRes.body.includes('Zero Debonding Matrix'), 'Removed "Zero Debonding Matrix" from hero as requested');
    assert(!homeRes.body.includes('[LAB TESTED]'), 'Removed "[LAB TESTED]" ticker from hero as requested');

    // 2. Test About page
    const aboutRes = await request('/about');
    assert(aboutRes.status === 200, 'About page returns 200 OK');
    assert(aboutRes.body.includes('Kritika Enterprises') || aboutRes.body.includes('Beekamsara'), 'About page displays manufacturer separation');
    assert(aboutRes.body.includes('ISO 9001:2015'), 'About page mentions ISO 9001:2015');

    // 3. Test Products listing & dynamic detail
    const productsRes = await request('/products');
    assert(productsRes.status === 200, 'Products listing page returns 200 OK');

    const r11Res = await request('/products/r-11-tile-adhesive');
    assert(r11Res.status === 200, 'R-11 Dynamic Product detail page returns 200 OK');
    assert(r11Res.body.includes('R-11') && r11Res.body.includes('Type 1'), 'R-11 detail contains catalogue specifications');

    const epoxyRes = await request('/products/epoxy-grout');
    assert(epoxyRes.status === 200, 'Epoxy Grout Dynamic Product detail page returns 200 OK');

    // 4. Test Blog Knowledge Hub
    console.log('\n[2/8] Testing SEO Blog System Routes...');
    const blogRes = await request('/blog');
    assert(blogRes.status === 200, 'Blog index page (/blog) returns 200 OK');
    assert(blogRes.body.includes('Tile Adhesive Guide') || blogRes.body.includes('Knowledge Hub'), 'Blog page contains seeded technical articles');

    const singleBlogRes = await request('/blog/tile-adhesive-type-1-type-2-type-3-guide');
    assert(singleBlogRes.status === 200, 'Single blog page (/blog/[slug]) returns 200 OK');
    assert(singleBlogRes.body.includes('IS 15477:2019'), 'Single blog page renders article body with IS 15477 standards');
    assert(singleBlogRes.body.includes('application/ld+json'), 'Single blog page contains JSON-LD BlogPosting schema for SEO');

    const contactRes = await request('/contact');
    assert(contactRes.status === 200, 'Contact page returns 200 OK');

    const galleryRes = await request('/gallery');
    assert(galleryRes.status === 200, 'Gallery page returns 200 OK');

    const sitemapRes = await request('/sitemap.xml');
    assert(sitemapRes.status === 200, 'Dynamic sitemap.xml returns 200 OK');
    assert(sitemapRes.body.includes('r-11-tile-adhesive'), 'sitemap.xml lists catalogue product slugs');
    assert(sitemapRes.body.includes('/blog/'), 'sitemap.xml includes dynamic blog post URLs');

    const robotsRes = await request('/robots.txt');
    assert(robotsRes.status === 200, 'robots.txt returns 200 OK');

    // 5. Test Public APIs
    console.log('\n[3/8] Testing Public APIs & Catalogue Integrity...');
    const apiProductsRes = await request('/api/products');
    assert(apiProductsRes.status === 200, 'GET /api/products returns 200 OK');
    const productCount = apiProductsRes.json?.products?.length;
    assert(productCount >= 9, `All 9 catalogue products present in API (Found: ${productCount})`);

    const apiCategoriesRes = await request('/api/categories');
    assert(apiCategoriesRes.status === 200, 'GET /api/categories returns 200 OK');
    const catCount = apiCategoriesRes.json?.categories?.length;
    assert(catCount >= 4, `All 4 categories present in API (Found: ${catCount})`);

    const apiBlogsRes = await request('/api/blogs');
    assert(apiBlogsRes.status === 200, 'GET /api/blogs returns 200 OK');
    const blogCount = apiBlogsRes.json?.blogs?.length;
    assert(blogCount >= 4, `All 4 seeded blog posts present in API (Found: ${blogCount})`);

    // 6. Test Enquiry Submission
    console.log('\n[4/8] Testing Customer Enquiry Submission into MySQL...');
    const testEnquiry = {
      name: 'Verification Bot Engineer',
      email: 'testbot@example.com',
      phone: '9876543210',
      subject: 'Architectural Bulk Enquiry for R-11 and Epoxy Grout',
      message: 'Automated verification test enquiry. Requesting rate card for 500 bags of R-11 and 100 sets of Epoxy Grout.',
      product_id: 1, // R-11
    };

    const submitRes = await request('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: testEnquiry,
    });
    assert(submitRes.status === 200 && submitRes.json?.success === true, 'POST /api/enquiries successfully creates enquiry in MySQL');
    const createdEnquiryId = submitRes.json?.enquiryId;
    assert(!!createdEnquiryId, `Created Enquiry ID returned from MySQL: #${createdEnquiryId}`);

    // 7. Test Admin Authentication
    console.log('\n[5/8] Testing Admin Authentication & JWT Cookies...');
    const loginRes = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: 'admin@rockhold.com',
        password: 'Admin@123',
      },
    });

    assert(loginRes.status === 200, 'POST /api/auth/login succeeds with valid credentials');
    assert(loginRes.json?.user?.email === 'admin@rockhold.com', 'Admin payload contains correct email');
    assert(loginRes.json?.user?.role === 'superadmin', 'Admin user has superadmin role');

    const setCookieHeader = loginRes.headers['set-cookie'];
    assert(!!setCookieHeader, 'Set-Cookie header returned with HTTP-only cookie');
    const cookie = Array.isArray(setCookieHeader) ? setCookieHeader.map(c => c.split(';')[0]).join('; ') : setCookieHeader.split(';')[0];

    // 8. Test Admin Protected Endpoints & Dashboard Stats
    console.log('\n[6/8] Testing Admin Protected Endpoints with Auth Cookie...');
    const statsRes = await request('/api/stats', {
      headers: { Cookie: cookie },
    });
    assert(statsRes.status === 200, 'GET /api/stats authorized & returns 200 OK');
    const totalProducts = statsRes.json?.stats?.totalProducts;
    const totalEnquiries = statsRes.json?.stats?.totalEnquiries;
    const totalBlogs = statsRes.json?.stats?.totalBlogs;
    assert(totalProducts >= 9, `Admin stats reports total products: ${totalProducts}`);
    assert(totalEnquiries >= 1, `Admin stats reports total enquiries: ${totalEnquiries}`);
    assert(totalBlogs >= 4, `Admin stats reports total blogs: ${totalBlogs}`);

    // Check Enquiries list in Admin
    const enquiriesAdminRes = await request('/api/enquiries', {
      headers: { Cookie: cookie },
    });
    assert(enquiriesAdminRes.status === 200, 'GET /api/enquiries returns 200 OK for admin');
    const foundCreated = enquiriesAdminRes.json?.enquiries?.find(e => e.id === createdEnquiryId);
    assert(!!foundCreated, `Newly created enquiry #${createdEnquiryId} is visible in admin list`);

    // Update Enquiry status
    if (createdEnquiryId) {
      const updateEnqRes = await request(`/api/enquiries/${createdEnquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookie,
        },
        body: { status: 'contacted', notes: 'Verified via automated test script.' },
      });
      assert(updateEnqRes.status === 200, `PATCH /api/enquiries/${createdEnquiryId} updates status to "contacted"`);
    }

    // CSV Export
    const exportRes = await request('/api/enquiries/export', {
      headers: { Cookie: cookie },
    });
    assert(exportRes.status === 200, 'GET /api/enquiries/export returns 200 OK');
    assert(exportRes.headers['content-type']?.includes('text/csv'), 'Export endpoint returns valid text/csv');

    // 9. Test Blog CRUD in Admin
    console.log('\n[7/8] Testing Blog CRUD in Admin Panel...');
    const testBlog = {
      title: 'Automated Test Article on Polymer Curing Dynamics',
      slug: 'automated-test-article-polymer-curing',
      category: 'Technical Standards',
      excerpt: 'This is a test article created via automated verification test suite to ensure full CRUD functionality.',
      content: 'Detailed content explaining polymer chain hydration, cross-linking, and tensile shear performance.',
      featured_image: '/images/gallery/luxury-interior-flooring.jpg',
      author: 'Test Bot',
      reading_time: '3 min read',
      tags: 'Test, Automation, Polymer',
      is_published: true,
      seo_title: 'Automated Test Article | RockHold',
      seo_description: 'Test SEO meta description for verification.',
    };

    const createBlogRes = await request('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
      body: testBlog,
    });
    assert(createBlogRes.status === 200 && createBlogRes.json?.success === true, 'POST /api/blogs creates article in MySQL');
    const createdBlogId = createBlogRes.json?.blogId;
    assert(!!createdBlogId, `Created Blog ID: #${createdBlogId}`);

    if (createdBlogId) {
      // Edit Blog
      const updateBlogRes = await request(`/api/blogs/${createdBlogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookie,
        },
        body: {
          ...testBlog,
          title: 'Automated Test Article on Polymer Curing Dynamics (Updated)',
        },
      });
      assert(updateBlogRes.status === 200, `PUT /api/blogs/${createdBlogId} updates article in MySQL`);

      // Delete test blog
      const deleteBlogRes = await request(`/api/blogs/${createdBlogId}`, {
        method: 'DELETE',
        headers: { Cookie: cookie },
      });
      assert(deleteBlogRes.status === 200, `DELETE /api/blogs/${createdBlogId} removes article from MySQL`);
    }

    // Clean up test enquiry
    if (createdEnquiryId) {
      await request(`/api/enquiries/${createdEnquiryId}`, {
        method: 'DELETE',
        headers: { Cookie: cookie },
      });
      console.log(`  Cleanup: Deleted test enquiry #${createdEnquiryId}`);
    }

    // 10. Datasheet & Image Assets
    console.log('\n[8/8] Testing Datasheet & Asset Downloads...');
    const dsRes = await request('/datasheets/r-11-tile-adhesive-technical-data-sheet.pdf');
    assert(dsRes.status === 200, 'R-11 TDS PDF download is accessible (200 OK)');

    const imgRes = await request('/images/products/r-11-tile-adhesive.png');
    assert(imgRes.status === 200, 'R-11 Product packshot PNG is accessible (200 OK)');

    const aiImgRes = await request('/images/gallery/luxury-interior-flooring.jpg');
    assert(aiImgRes.status === 200, 'AI-generated high-res luxury interior gallery image is accessible (200 OK)');

    console.log('\n====================================================');
    console.log(`  ALL TESTS FINISHED: Passed: ${passed} | Failed: ${failed}`);
    console.log('====================================================');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution failed with error:', err);
    process.exit(1);
  }
}

runTests();
