"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();
                setCategories(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
            </div>
        );
    }

    // Fallback to initial categories if database is empty
    const displayCategories = categories.length > 0 ? categories : [
        { name: "EARRINGS", img: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771524245/unnamed_tjod5f.jpg" },
        { name: "NECKLACE SETS", img: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771525028/unnamed_mxxjmi.jpg" },
        { name: "BRACELETS", img: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771521518/unnamed_etk2kj.jpg" },
        { name: "CHAINS", img: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771522236/unnamed_jo5jp3.jpg" },
        { name: "RINGS", img: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474594/Salty-1949256_6731d7bd-2d4e-4613-9717-115483a412ee_vm7rgw.webp" },
        { name: "PENDANTS", img: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771473977/BIPS0004P07_YAA14DIG6BLTOXXXX_ABCD00-PICS-00004-1024-34391_utruqa.webp" },


    ];

    return (
        <div className="py-20 px-4 max-w-350 mx-auto">
            <h2 className="text-center font-serif text-3xl md:text-5xl font-light tracking-widest mb-4 text-[#1a1a1a]">
                Everyday Fine Jewelry
            </h2>
            <p className="text-center text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase mb-12">
                Curated Collections for Every Moment
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
                {displayCategories.map((category, index) => (
                    <a href={`/search?q=${encodeURIComponent(category.name || "")}`} key={index} className="relative group cursor-pointer overflow-hidden aspect-3/4 rounded-sm shadow-sm ring-1 ring-black/5 block">
                        <img
                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                            src={category.image || category.img || "/placeholder.jpg"}
                            alt={category.name || "Category Image"}
                        />
                        {/* Elegant Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                        {/* Category Name Label */}
                        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center">
                            <span className="text-white text-[11px] md:text-xs font-medium tracking-[0.25em] uppercase border-b border-transparent group-hover:border-white pb-1 transition-all duration-300">
                                {category.name}
                            </span>
                            <span className="text-white/0 group-hover:text-white/80 text-[10px] tracking-widest uppercase mt-2 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                Explore
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Categories;
