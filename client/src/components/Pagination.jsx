import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
function Pagination({ currentPage, totalPages, onPageChange }) {
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getAdjacentPageNumbers = () => {
    const adjacentPageCount = 2;
    const pages = [];
    const startPage = Math.max(1, currentPage - adjacentPageCount);
    const endPage = Math.min(totalPages, currentPage + adjacentPageCount);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    return pages;
  };

  return (
    <nav className='flex items-center justify-between border-t border-blue-gray-50 p-4 w-full'>
          <Button variant="outlined" size="sm"
            onClick={() => goToPage(currentPage - 1)}
            className={`${
              currentPage === 1 ? 'pointer-events-none' : ''
            }`}
          >
            <span>&lt; Previous</span>
          </Button>
      <ul className='flex items-center gap-2'>
      
        
       
        {getAdjacentPageNumbers().map((page) => (
          
          <li key={page}>
          <div className="flex items-center gap-2">
          <IconButton variant={currentPage === page ? "outlined" : "text"} size="sm"
              onClick={() => goToPage(page)}
              // className={`relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-cs-textHdClr hover:bg-gray-200 ${
              //   currentPage === page ? 'bg-purple-700' : 'bg-gray-200'
              // }`}
            >
              <span>{page}</span>
            </IconButton>
          </div>
          </li>
        ))}
      
        
      </ul>
        <Button variant="outlined" size="sm"
            onClick={() => goToPage(currentPage + 1)}
            className={`relative ${
              currentPage === totalPages ? 'pointer-events-none' : ''
            }`}
          >
            <span>Next &gt;</span>
          </Button>
    </nav>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
