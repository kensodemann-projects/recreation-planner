'use client';

import { Place, PlaceType } from '@/models';
import { useMemo, useState } from 'react';
import PlaceCard from './ui/place-card';

export interface FilteredPlacesProps {
  places: Place[];
  placeTypes: PlaceType[];
}

const FilteredPlaces = ({ places, placeTypes }: FilteredPlacesProps) => {
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');

  const filteredPlaces = useMemo(() => {
    const needle = searchText.toLowerCase().trim();

    return places.filter((p) => {
      const matchesType = selectedTypeId === null || p.type.id === selectedTypeId;
      const matchesSearch =
        !needle ||
        p.name.toLowerCase().includes(needle) ||
        p.address.line1?.toLowerCase()?.includes(needle) ||
        p.address.line2?.toLowerCase()?.includes(needle) ||
        p.address.city?.toLowerCase()?.includes(needle) ||
        p.address.state?.toLowerCase()?.includes(needle) ||
        p.address.postal?.toLowerCase()?.includes(needle);
      return matchesType && matchesSearch;
    });
  }, [places, searchText, selectedTypeId]);

  const clearFilters = () => {
    setSelectedTypeId(null);
    setSearchText('');
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center mb-4">
        <label className="flex items-center gap-2">
          <span>Place Type</span>
          <select
            className="select select-bordered flex-1"
            aria-label="Place Type"
            value={selectedTypeId ?? ''}
            onChange={(e) => setSelectedTypeId(e.target.value ? +e.target.value : null)}
          >
            <option value="">All</option>
            {placeTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
        <input
          type="search"
          className="input input-bordered w-full md:col-span-2"
          aria-label="Search"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="flex justify-center md:justify-end">
          <button className="btn btn-ghost" onClick={clearFilters}>
            Clear Filter
          </button>
        </div>
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredPlaces.map((x) => (
          <PlaceCard place={x} key={x.id} />
        ))}
      </div>
    </>
  );
};

export default FilteredPlaces;
