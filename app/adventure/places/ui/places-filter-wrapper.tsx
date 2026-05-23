'use client';

import { Place, PlaceType } from '@/models';
import { useState } from 'react';
import PlaceCard from './place-card';

export interface PlacesFilterWrapperProps {
  places: Place[];
  placeTypes: PlaceType[];
}

const PlacesFilterWrapper = ({ places, placeTypes }: PlacesFilterWrapperProps) => {
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);

  const filteredPlaces = selectedTypeId ? places.filter((p) => p.type.id === selectedTypeId) : places;

  const clearFilters = () => setSelectedTypeId(null);

  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <label className="flex items-center gap-2">
          <span>Place Type</span>
          <select
            className="select select-bordered"
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
        <button className="btn btn-ghost" onClick={clearFilters}>
          Clear Filter
        </button>
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredPlaces.map((x) => (
          <PlaceCard place={x} key={x.id} />
        ))}
      </div>
    </>
  );
};

export default PlacesFilterWrapper;
