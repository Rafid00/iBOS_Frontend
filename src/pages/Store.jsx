import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../contexts/ProductContext"; // Import ProductContext

// StorePage component
const StorePage = () => {
   const { products, loading } = useContext(ProductContext); // Access products from context
   const [activeFilter, setActiveFilter] = useState(""); // Keep track of selected filter
   const [currentPage, setCurrentPage] = useState(1); // Pagination state for products
   const [filterStartIndex, setFilterStartIndex] = useState(0); // Start index for visible filters

   const itemsPerPage = 6; // Products per page
   const filtersVisibleCount = 13; // Number of visible filters at once

   if (loading) {
      return <div>Loading products...</div>; // Show loading state while fetching data
   }

   // Extract unique product types from products array
   const productTypes = [...new Set(products.map((product) => product.name))];

   // Slice the product types based on the current start index
   const visibleFilters = productTypes.slice(filterStartIndex, filterStartIndex + filtersVisibleCount);

   const filteredProducts = products.filter((product) => {
      if (activeFilter) {
         return product.name.toLowerCase().includes(activeFilter.toLowerCase());
      }
      return true;
   });

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

   const handleFilterChange = (filter) => {
      setActiveFilter((prevFilter) => (prevFilter === filter ? "" : filter));
      setCurrentPage(1);
   };

   const handlePageChange = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
         setCurrentPage(pageNumber);
      }
   };

   const handleFilterNext = () => {
      if (filterStartIndex + filtersVisibleCount < productTypes.length) {
         setFilterStartIndex(filterStartIndex + filtersVisibleCount);
      }
   };

   const handleFilterPrev = () => {
      if (filterStartIndex > 0) {
         setFilterStartIndex(filterStartIndex - filtersVisibleCount);
      }
   };

   // Logic for rendering pagination with arrows and limited page numbers
   const renderPageNumbers = () => {
      const pageNumbers = [];

      if (totalPages <= 4) {
         for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
         }
      } else {
         pageNumbers.push(1, 2);

         if (currentPage > 2 && currentPage < totalPages - 1) {
            pageNumbers.push(currentPage);
         }

         pageNumbers.push("...", totalPages);
      }

      return pageNumbers;
   };

   return (
      <div className="font-barlow">
         <Navbar />

         <div className="grid grid-cols-1 lg:grid-cols-4 gap-[42px] py-4 lg:py-8 container mx-auto">
            {/* Filter Menu with Horizontal Pagination */}
            <div className="bg-white pr-12 border-r-2 border-[#E8E8E8] lg:col-span-1 pl-12 lg:pl-0">
               <ul className="flex flex-wrap font-semibold text-[#717171]">
                  {visibleFilters.map((type) => (
                     <li key={type} className="w-full border-b-[1px] last:border-b-0 mt-1">
                        <button
                           onClick={() => handleFilterChange(type)}
                           className={`w-full text-left py-3 px-4 mb-2 ${
                              activeFilter === type ? "bg-[#0E0E0E] text-white rounded-md" : " hover:bg-gray-200"
                           }`}
                        >
                           {type}
                        </button>
                     </li>
                  ))}
               </ul>

               {/* Horizontal Arrows for Filter Pagination */}
               <div className="flex justify-center mt-10">
                  <button
                     onClick={handleFilterPrev}
                     disabled={filterStartIndex === 0}
                     className={`px-4 py-2 rounded-md ${
                        filterStartIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
                     }`}
                  ></button>
                  <button
                     onClick={handleFilterNext}
                     disabled={filterStartIndex + filtersVisibleCount >= productTypes.length}
                     className={`px-4 py-2 ml-2 rounded-md ${
                        filterStartIndex + filtersVisibleCount >= productTypes.length
                           ? "bg-gray-300 cursor-not-allowed"
                           : "bg-gray-200 hover:bg-gray-300"
                     }`}
                  ></button>
               </div>
            </div>

            {/* Product Cards */}
            <div className="relative lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 px-8 lg:px-0 gap-4 lg:grid-cols-subgrid lg:grid-rows-2 gap-y-16 lg:gap-y-32 gap-x-0 justify-items-center lg:justify-items-center mb-60 lg:pb-14">
               {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
               ))}
               {/* Pagination */}
               <nav
                  className="absolute flex items-center gap-x-3 justify-center -bottom-32 left-[50%] -translate-x-[50%]"
                  aria-label="Pagination"
               >
                  <button
                     type="button"
                     onClick={() => handlePageChange(currentPage - 1)}
                     disabled={currentPage === 1}
                     className="min-h-[38px] border-[#DFE3E8] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                     aria-label="Previous"
                  >
                     <svg
                        className="shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     >
                        <path d="m15 18-6-6 6-6"></path>
                     </svg>
                     <span className="sr-only">Previous</span>
                  </button>

                  <div className="flex items-center gap-x-3">
                     {renderPageNumbers().map((page, index) =>
                        page === "..." ? (
                           <div key={index} className="hs-tooltip inline-block border border-[#DFE3E8] rounded-md">
                              <button
                                 type="button"
                                 className="hs-tooltip-toggle transition-all group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-blue-600 p-2 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                              >
                                 <span className="group-hover:hidden text-xs">•••</span>
                                 <svg
                                    className="group-hover:block hidden shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                 >
                                    <path d="m6 17 5-5-5-5"></path>
                                    <path d="m13 17 5-5-5-5"></path>
                                 </svg>
                                 <span
                                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                                    role="tooltip"
                                 >
                                    Next 4 pages
                                 </span>
                              </button>
                           </div>
                        ) : (
                           <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`min-h-[38px] border  min-w-[38px] flex justify-center items-center text-black font-bold py-2 px-3 text-sm rounded-md focus:outline-none focus:bg-gray-100 ${
                                 currentPage === page ? "border-black" : "hover:bg-gray-100 border-[#DFE3E8]"
                              }`}
                              aria-current={currentPage === page ? "page" : undefined}
                           >
                              {page}
                           </button>
                        )
                     )}
                  </div>

                  <button
                     type="button"
                     onClick={() => handlePageChange(currentPage + 1)}
                     disabled={currentPage === totalPages}
                     className="min-h-[38px] border-[#DFE3E8] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md border text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                     aria-label="Next"
                  >
                     <svg
                        className="shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     >
                        <path d="m9 18 6-6-6-6"></path>
                     </svg>
                     <span className="sr-only">Next</span>
                  </button>
               </nav>
            </div>
         </div>

         <Footer />
      </div>
   );
};

export default StorePage;
