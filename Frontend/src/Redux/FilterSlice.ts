import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterState = {
    search: string;
    onlyLiked: boolean;
    sortBy: "price" | "date";
    minPrice: number | null;
    maxPrice: number | null;
    activePage: number;
};

const initialState: FilterState = {
    search: "",
    onlyLiked: false,
    sortBy: "date",
    minPrice: null,
    maxPrice: null,
    activePage: 1
};

// Set search query for destinations
function setSearch(state: FilterState, action: PayloadAction<string>) {
    state.search = action.payload;
}

// Toggle viewing only liked vacations
function toggleOnlyLiked(state: FilterState) {
    state.onlyLiked = !state.onlyLiked;
}

// Set sorting by "price" or by "date"
function setSortBy(state: FilterState, action: PayloadAction<"price" | "date">) {
    state.sortBy = action.payload;
}

// Set price boundaries
function setMinPrice(state: FilterState, action: PayloadAction<number | null>) {
    state.minPrice = action.payload;
}
function setMaxPrice(state: FilterState, action: PayloadAction<number | null>) {
    state.maxPrice = action.payload;
}

// Set active page for pagination
function setActivePage(state: FilterState, action: PayloadAction<number>) {
    state.activePage = action.payload;
}

// Reset filters to defaults
function resetFilters() {
    return initialState;
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSearch,
        toggleOnlyLiked,
        setSortBy,
        setMinPrice,
        setMaxPrice,
        setActivePage,
        resetFilters
    }
});

export const filterActions = filterSlice.actions;