import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const CATEGORIES = [
  {
    title: "Gold Jewellery",
    metal: "Gold",
    subtitle: "22K BIS 916 Hallmarked",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
    tag: "Traditional & Modern"
  },
  {
    title: "Diamond Solitaires",
    metal: "Diamond",
    subtitle: "IGI Certified VVS Diamonds",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80",
    tag: "Romantic Luxury"
  },
  {
    title: "925 Pure Silver",
    metal: "Silver",
    subtitle: "Sterling Silver & Oxidised",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80",
    tag: "Payal & Everyday Wear"
  },
  {
    title: "Heritage Kundan & Polki",
    metal: "Fashion / Heritage",
    subtitle: "Royal Rajputana Handcrafted",
    image: "https://images.unsplash.com/photo-1611591475847-a7eb6d9fbeae?auto=format&fit=crop&w=700&q=80",
    tag: "Bridal Statement"
  }
];

export default function CategoryShowcase() {
  const { setFilterMetal, setFilterCategory, setCurrentView } = useStore();

  const handleSelectCategory = (metal) => {
    setFilterMetal(metal);
    setFilterCategory('All');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-rosegold-600 font-bold">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-rosewood-900 mt-2 font-normal">
            Shop By Jewellery Category
          </h2>
          <div className="w-16 h-0.5 bg-rosegold-400 mx-auto mt-3"></div>
          <p className="text-xs sm:text-sm text-rosewood-600 mt-3 font-light">
            Every piece is imbued with legacy, master artistry, and verified purity benchmarks.
          </p>
        </div>

        {/* 4 Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectCategory(cat.metal)}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 bg-rosewood-950"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-rosewood-950 via-rosewood-900/30 to-transparent"></div>

              {/* Tag Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-ivory-100/90 backdrop-blur-sm text-rosewood-900 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-rosegold-200">
                  {cat.tag}
                </span>
              </div>

              {/* Text Card bottom */}
              <div className="absolute bottom-6 left-6 right-6 text-ivory-50">
                <p className="text-[11px] text-rosegold-300 uppercase tracking-widest font-medium">
                  {cat.subtitle}
                </p>
                <h3 className="font-serif text-2xl font-normal mt-1 mb-2 group-hover:text-rosegold-200 transition-colors">
                  {cat.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-semibold text-rosegold-300 group-hover:text-white transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
