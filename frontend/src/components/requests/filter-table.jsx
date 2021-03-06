import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './styles/filterable-column.scss';

export default function FilterableColumn({ columnName }) {
    const ref = useRef(null);
    const [showFilters, setShowFilters] = useState(false);

    // Pattern for trapping a click outside the element
    // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    useEffect(() => {
        function handleClickOutside(ev) {
            if(showFilters && ref.current && !ref.current.contains(ev.target)) {
                setShowFilters(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, showFilters]);

    return <span className="filterable-column" ref={ref}>
        <span onClick={() => setShowFilters(!showFilters)}>
            {columnName}
            <Icon icon='filter' className="show-filters-icon" />
        </span>
        <div className={showFilters ? "filters" : "filters filters--hidden"}>
            filters
        </div>
    </span>;
}