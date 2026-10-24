import clsx from "clsx";
import { CATEGORIES, Category, regions } from "../photos";
import "./filters.css";

interface IFiltersProps {
    region?: string;
    place?: string;
    category?: Category;
    validCategories: Set<Category>;
    onRegion: (region?: string) => void;
    onPlace: (place?: string) => void;
    onCategory: (category?: Category) => void;
}

function FilterButton({
    active,
    disabled,
    onClick,
    children,
}: {
    active: boolean;
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            aria-pressed={active}
            disabled={disabled}
            className={clsx(
                "me-2 me-md-3 filter-item",
                active ? "border-2 active-border" : "border-bottom border-2 border-transparent",
                disabled && "text-decoration-line-through"
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default function Filters({
    region,
    place,
    category,
    validCategories,
    onRegion,
    onPlace,
    onCategory,
}: IFiltersProps) {
    const activeRegion = regions.find((r) => r.name === region);

    return (
        <>
            <div className="mb-2 d-flex align-items-center flex-wrap" role="group" aria-label="Photo type">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="bi bi-camera me-2 me-md-3 filter-icon"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                >
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                </svg>
                <FilterButton active={!category} onClick={() => onCategory(undefined)}>
                    All
                </FilterButton>
                {CATEGORIES.map((c) => (
                    <FilterButton
                        key={c}
                        active={category === c}
                        disabled={!validCategories.has(c)}
                        onClick={() => onCategory(c)}
                    >
                        {c}
                    </FilterButton>
                ))}
            </div>
            <div className="d-flex align-items-center flex-wrap" role="group" aria-label="Region">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="bi bi-geo-alt me-2 me-md-3 filter-icon"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                >
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                <FilterButton active={!activeRegion} onClick={() => onRegion(undefined)}>
                    All
                </FilterButton>
                {regions.map((r) => (
                    <FilterButton key={r.name} active={activeRegion === r} onClick={() => onRegion(r.name)}>
                        {r.name}
                    </FilterButton>
                ))}
            </div>
            <div className="place-row mb-4" role="group" aria-label="Country">
                <span className="filter-icon place-row-indent me-2 me-md-3" aria-hidden="true" />
                {activeRegion && (
                    <>
                        <button
                            type="button"
                            aria-pressed={!place}
                            className={clsx("place-item", !place && "place-item-active")}
                            onClick={() => onPlace(undefined)}
                        >
                            All {activeRegion.name}
                        </button>
                        {activeRegion.places.map((p) => (
                            <button
                                key={p}
                                type="button"
                                aria-pressed={place === p}
                                className={clsx("place-item", place === p && "place-item-active")}
                                onClick={() => onPlace(p)}
                            >
                                {p}
                            </button>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
