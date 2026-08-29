import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Image as ImageIcon, 
  FileText, 
  Inbox, 
  Settings as SettingsIcon, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  CheckCircle, 
  ArrowLeft,
  Globe,
  Upload,
  Eye
} from 'lucide-react';

export default function AdminDashboard({ data, setData, setIsAdminMode, inquiries = [] }) {
  const [activeTab, setActiveTab] = useState('products'); // 'dashboard', 'products', 'media', 'pages', 'inquiries'
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [saveNotification, setSaveNotification] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState({
    code: 'NGC' + Math.floor(1000 + Math.random() * 9000),
    name: '',
    category_id: 'glazed-ceramic',
    dimensions: 'D50xH45 cm',
    material: 'Glazed Ceramic Stoneware',
    firing_temp: '1100°C High Fired',
    in_stock: true,
    images: ['/images/home_banner_1.jpg']
  });

  // Company info form state
  const [companyForm, setCompanyForm] = useState(data?.company || {});
  const [brandQuote, setBrandQuote] = useState(data?.company?.brand_quote || '');

  const showSavedAlert = () => {
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3000);
  };

  // Add Product Handler
  const handleAddProduct = (e) => {
    e.preventDefault();
    const updatedCategories = data.categories.map((cat) => {
      if (cat.id === newProd.category_id) {
        const categoryTitle = cat.title;
        const newProductObj = {
          ...newProd,
          id: 'prod-' + Date.now(),
          category_title: categoryTitle
        };
        return {
          ...cat,
          products: [newProductObj, ...(cat.products || [])]
        };
      }
      return cat;
    });

    setData({ ...data, categories: updatedCategories });
    setShowAddProductModal(false);
    showSavedAlert();
  };

  // Delete Product Handler
  const handleDeleteProduct = (catId, prodId) => {
    if (window.confirm('Are you sure you want to delete this pot product from WordPress catalog?')) {
      const updatedCategories = data.categories.map((cat) => {
        if (cat.id === catId) {
          return {
            ...cat,
            products: cat.products.filter((p) => p.id !== prodId)
          };
        }
        return cat;
      });
      setData({ ...data, categories: updatedCategories });
      showSavedAlert();
    }
  };

  // Update Company / Pages Handler
  const handleSaveCompany = (e) => {
    e.preventDefault();
    setData({
      ...data,
      company: {
        ...companyForm,
        brand_quote: brandQuote
      }
    });
    showSavedAlert();
  };

  const allProducts = data?.categories?.flatMap(c => c.products || []) || [];

  return (
    <div className="min-h-screen bg-[#1F1C1B] text-[#E5DFD5] flex flex-col font-sans">
      {/* WordPress Top Admin Bar */}
      <div className="bg-[#110F0E] border-b border-[#3A3532] px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span className="font-serif font-bold text-white text-sm flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#C85A32] flex items-center justify-center text-white text-xs font-serif font-bold">
              W
            </span>
            WordPress Admin - CTN NEXUS CMS
          </span>
          <button
            onClick={() => setIsAdminMode(false)}
            className="text-[#A89F91] hover:text-white flex items-center gap-1 bg-[#2B2725] px-2.5 py-1 rounded"
          >
            <Globe className="w-3.5 h-3.5 text-[#C85A32]" /> View Live Website
          </button>
        </div>

        {saveNotification && (
          <div className="bg-[#5C6B57] text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 animate-fade-in">
            <CheckCircle className="w-3.5 h-3.5" /> WordPress Database Saved Successfully!
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* WordPress Left Navigation Sidebar */}
        <aside className="w-56 bg-[#161413] border-r border-[#3A3532] p-4 space-y-6 shrink-0 hidden md:block">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-[#7A7268] tracking-widest px-2">Navigation</p>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-colors ${
                activeTab === 'dashboard' ? 'bg-[#C85A32] text-white' : 'text-[#A89F91] hover:bg-[#2B2725] hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-colors ${
                activeTab === 'products' ? 'bg-[#C85A32] text-white' : 'text-[#A89F91] hover:bg-[#2B2725] hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" /> Products ({allProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-colors ${
                activeTab === 'media' ? 'bg-[#C85A32] text-white' : 'text-[#A89F91] hover:bg-[#2B2725] hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" /> Media & Banners
            </button>
            <button
              onClick={() => setActiveTab('pages')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-colors ${
                activeTab === 'pages' ? 'bg-[#C85A32] text-white' : 'text-[#A89F91] hover:bg-[#2B2725] hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" /> Pages & Brand Story
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-colors ${
                activeTab === 'inquiries' ? 'bg-[#C85A32] text-white' : 'text-[#A89F91] hover:bg-[#2B2725] hover:text-white'
              }`}
            >
              <Inbox className="w-4 h-4" /> B2B Quote Inquiries ({inquiries.length})
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#1F1C1B] p-6 overflow-y-auto space-y-6">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h1 className="font-serif text-2xl font-bold text-white">WordPress CMS Overview</h1>
                <span className="text-xs text-[#7A7268]">WordPress 6.4.3 • CTN NEXUS Theme</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#2B2725] border border-[#3A3532] rounded-lg p-4 space-y-1">
                  <span className="text-xs text-[#A89F91]">Total Pot Products</span>
                  <p className="font-serif text-3xl font-bold text-white">{allProducts.length}</p>
                </div>
                <div className="bg-[#2B2725] border border-[#3A3532] rounded-lg p-4 space-y-1">
                  <span className="text-xs text-[#A89F91]">Product Categories</span>
                  <p className="font-serif text-3xl font-bold text-[#C85A32]">{data?.categories?.length || 6}</p>
                </div>
                <div className="bg-[#2B2725] border border-[#3A3532] rounded-lg p-4 space-y-1">
                  <span className="text-xs text-[#A89F91]">In-Stock Items</span>
                  <p className="font-serif text-3xl font-bold text-[#5C6B57]">{allProducts.filter(p => p.in_stock).length}</p>
                </div>
                <div className="bg-[#2B2725] border border-[#3A3532] rounded-lg p-4 space-y-1">
                  <span className="text-xs text-[#A89F91]">Quote Inquiries</span>
                  <p className="font-serif text-3xl font-bold text-[#C59B27]">{inquiries.length}</p>
                </div>
              </div>

              <div className="bg-[#2B2725] border border-[#3A3532] rounded-lg p-6 space-y-4">
                <h3 className="font-serif font-bold text-lg text-white">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => { setActiveTab('products'); setShowAddProductModal(true); }}
                    className="px-4 py-2 bg-[#C85A32] hover:bg-[#A34828] text-white text-xs font-semibold rounded flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add New Pot Model
                  </button>
                  <button
                    onClick={() => setActiveTab('pages')}
                    className="px-4 py-2 bg-[#3A3532] hover:bg-[#4A4440] text-white text-xs font-semibold rounded flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" /> Edit Company Info
                  </button>
                  <button
                    onClick={() => setIsAdminMode(false)}
                    className="px-4 py-2 bg-[#5C6B57] hover:bg-[#495545] text-white text-xs font-semibold rounded flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" /> Preview Live Site
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGER */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-white">Product Catalog Management</h1>
                  <p className="text-xs text-[#A89F91]">Add, edit, or delete pot models, sizes, glazes, and stock status.</p>
                </div>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="px-4 py-2 bg-[#C85A32] hover:bg-[#A34828] text-white text-xs font-semibold rounded shadow flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add New Product
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-[#2B2725] border border-[#3A3532] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#E5DFD5]">
                    <thead className="bg-[#1D1B1A] border-b border-[#3A3532] text-[#A89F91] uppercase font-semibold">
                      <tr>
                        <th className="p-3">Image</th>
                        <th className="p-3">Code</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Dimensions</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3A3532]">
                      {data?.categories?.flatMap(cat => 
                        (cat.products || []).map(prod => (
                          <tr key={prod.id} className="hover:bg-[#342F2C] transition-colors">
                            <td className="p-3">
                              <img src={prod.images?.[0]} alt="" className="w-10 h-10 object-cover rounded bg-[#1D1B1A]" />
                            </td>
                            <td className="p-3 font-mono font-bold text-[#C59B27]">{prod.code}</td>
                            <td className="p-3 font-semibold text-white">{prod.name}</td>
                            <td className="p-3 text-[#A89F91]">{cat.title}</td>
                            <td className="p-3 text-[#A89F91]">{prod.dimensions}</td>
                            <td className="p-3">
                              {prod.in_stock ? (
                                <span className="bg-[#5C6B57] text-white text-[10px] px-2 py-0.5 rounded">In Stock</span>
                              ) : (
                                <span className="bg-[#4A4440] text-[#A89F91] text-[10px] px-2 py-0.5 rounded">Made To Order</span>
                              )}
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => handleDeleteProduct(cat.id, prod.id)}
                                className="p-1.5 text-[#C85A32] hover:bg-[#1D1B1A] rounded"
                                title="Delete product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MEDIA & BANNERS */}
          {activeTab === 'media' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="font-serif text-2xl font-bold text-white">Media Library & Homepage Banners</h1>
                <p className="text-xs text-[#A89F91]">Manage background sliders and category cover photos.</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-white">Homepage Slider Banners ({data?.home_sliders?.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {data?.home_sliders?.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-[#3A3532] bg-[#1D1B1A]">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                        Banner #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PAGES & COMPANY INFO */}
          {activeTab === 'pages' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="font-serif text-2xl font-bold text-white">Edit Company & Brand Content</h1>
                <p className="text-xs text-[#A89F91]">Update contact information, company address, and brand quote text.</p>
              </div>

              <form onSubmit={handleSaveCompany} className="bg-[#2B2725] border border-[#3A3532] rounded-lg p-6 space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-white">Company Name</label>
                  <input
                    type="text"
                    value={companyForm.name || ''}
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1D1B1A] border border-[#3A3532] rounded text-white focus:outline-none focus:border-[#C85A32]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-white">Telephone / WhatsApp</label>
                    <input
                      type="text"
                      value={companyForm.tel || ''}
                      onChange={(e) => setCompanyForm({ ...companyForm, tel: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1D1B1A] border border-[#3A3532] rounded text-white focus:outline-none focus:border-[#C85A32]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-white">Email Address</label>
                    <input
                      type="email"
                      value={companyForm.email || ''}
                      onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1D1B1A] border border-[#3A3532] rounded text-white focus:outline-none focus:border-[#C85A32]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-white">Company Address</label>
                  <input
                    type="text"
                    value={companyForm.address || ''}
                    onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1D1B1A] border border-[#3A3532] rounded text-white focus:outline-none focus:border-[#C85A32]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-white">Brand Story Quote (Homepage Quote Banner)</label>
                  <textarea
                    rows={4}
                    value={brandQuote}
                    onChange={(e) => setBrandQuote(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1D1B1A] border border-[#3A3532] rounded text-white focus:outline-none focus:border-[#C85A32]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C85A32] hover:bg-[#A34828] text-white font-semibold rounded shadow flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Page Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="font-serif text-2xl font-bold text-white">B2B Quote Inquiries Inbox</h1>
                <p className="text-xs text-[#A89F91]">Submitted requests from global clients & wholesale buyers.</p>
              </div>

              {inquiries.length === 0 ? (
                <div className="bg-[#2B2725] border border-[#3A3532] rounded-lg p-12 text-center text-[#A89F91]">
                  <Inbox className="w-12 h-12 mx-auto mb-2 text-[#7A7268]" />
                  <p className="text-sm font-semibold">No inquiries received yet.</p>
                  <p className="text-xs mt-1">When website visitors submit quote requests, they will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="bg-[#2B2725] border border-[#3A3532] rounded-lg p-5 space-y-3">
                      <div className="flex justify-between items-start border-b border-[#3A3532] pb-2 text-xs">
                        <div>
                          <h3 className="font-bold text-white text-sm">{inq.customer?.company} ({inq.customer?.name})</h3>
                          <p className="text-[#A89F91]">Email: {inq.customer?.email} | Tel: {inq.customer?.phone}</p>
                          <p className="text-[#C59B27]">Destination Port: {inq.customer?.destinationPort || 'N/A'}</p>
                        </div>
                        <span className="text-[11px] text-[#7A7268]">{inq.date}</span>
                      </div>

                      <div className="text-xs space-y-1">
                        <p className="font-semibold text-white">Requested Items ({inq.items?.length}):</p>
                        <ul className="list-disc list-inside text-[#A89F91] pl-2">
                          {inq.items?.map((item, i) => (
                            <li key={i}>{item.name} (Code: {item.code}) - {item.dimensions}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add New Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#2B2725] border border-[#3A3532] rounded-xl max-w-xl w-full p-6 space-y-4 text-xs text-[#E5DFD5]">
            <div className="flex items-center justify-between border-b border-[#3A3532] pb-3">
              <h3 className="font-serif text-lg font-bold text-white">Add New Pot Product to WordPress</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-[#A89F91] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-white">Product Code *</label>
                  <input
                    type="text"
                    required
                    value={newProd.code}
                    onChange={(e) => setNewProd({ ...newProd, code: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1D1B1A] border border-[#3A3532] rounded text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-white">Category *</label>
                  <select
                    value={newProd.category_id}
                    onChange={(e) => setNewProd({ ...newProd, category_id: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1D1B1A] border border-[#3A3532] rounded text-white"
                  >
                    {data?.categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-white">Pot Name / Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NGC5020-Giant Tapered Glazed Planter"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1D1B1A] border border-[#3A3532] rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-white">Dimensions</label>
                  <input
                    type="text"
                    placeholder="D60xH55 cm"
                    value={newProd.dimensions}
                    onChange={(e) => setNewProd({ ...newProd, dimensions: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1D1B1A] border border-[#3A3532] rounded text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-white">Stock Status</label>
                  <select
                    value={newProd.in_stock ? 'yes' : 'no'}
                    onChange={(e) => setNewProd({ ...newProd, in_stock: e.target.value === 'yes' })}
                    className="w-full px-3 py-2 bg-[#1D1B1A] border border-[#3A3532] rounded text-white"
                  >
                    <option value="yes">In Stock (Ready to Ship)</option>
                    <option value="no">Made To Order</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 bg-[#3A3532] text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C85A32] hover:bg-[#A34828] text-white font-semibold rounded"
                >
                  Add To Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
