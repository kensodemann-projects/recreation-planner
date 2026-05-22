import {
  BuildingLibraryIcon,
  CakeIcon,
  FilmIcon,
  FireIcon,
  HomeModernIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  SunIcon,
  TicketIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { ComponentType, SVGProps } from 'react';

export interface PlaceTypeIconProps {
  typeName: string;
  className?: string;
}

const PLACE_TYPE_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Attraction: SparklesIcon,
  Campground: FireIcon,
  Lodging: HomeModernIcon,
  Motorplex: TrophyIcon,
  Museum: BuildingLibraryIcon,
  Restaurant: CakeIcon,
  'Sports Arena': TicketIcon,
  'State Park': SunIcon,
  Theater: FilmIcon,
};

const PlaceTypeIcon = ({ typeName, className = 'w-6' }: PlaceTypeIconProps) => {
  const Icon = PLACE_TYPE_ICONS[typeName] ?? QuestionMarkCircleIcon;
  return (
    <span role="img" aria-label={`${typeName} icon`}>
      <Icon className={className} />
    </span>
  );
};

export default PlaceTypeIcon;
