import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const pageSize = 5;
    const [propertyList, setPropertyList] = useState([]);

    const paginateResults = (results, page) => {
        const pageStart = (page - 1) * pageSize;
        const pageEnd = page * pageSize;
        const currentPage = results.slice(pageStart, pageEnd);

        setPropertyList(currentPage);
    };

    useEffect(() => {
        let ignore = false;

        if (!ignore) {
            fetch("http://localhost:3000/api/properties").then((response) => {
                return response.json();
            }).then((data) => {
                paginateResults(data, 1);
            });
        }        

        return () => {
            ignore = true;
        }
    }, []);

    return (
        <ul className="PropertyListing">
            {propertyList.map((property, index) => (
                <li key={index}>
                    <PropertyCard {...property} />
                </li>
            ))}
        </ul>
    );
};

export default PropertyListing;
