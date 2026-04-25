import { AppState } from "../AppState";

// Selector for rendering vacations list applying searches and sorts locally
export const selectFilteredVacations = (state: AppState) => {
    let vacations = state.vacations;
    const f = state.filter;

    // Filter by destination string
    if (f.search) {
        vacations = vacations.filter(v =>
            v.destination?.toLowerCase().includes(f.search.toLowerCase())
        );
    }

    // Filter by like status
    if (f.onlyLiked) {
        vacations = vacations.filter(v => v.isLiked);
    }

    // Minimum boundary mapping
    if (f.minPrice !== null) {
        vacations = vacations.filter(v => (v.price || 0) >= f.minPrice!);
    }

    // Maximum boundary mapping
    if (f.maxPrice !== null) {
        vacations = vacations.filter(v => (v.price || 0) <= f.maxPrice!);
    }

    // Allow sorting by target properties specifically price or dates
    if (f.sortBy === "price") {
        vacations = [...vacations].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else {
        vacations = [...vacations].sort(
            (a, b) =>
                new Date(a.startDate || 0).getTime() -
                new Date(b.startDate || 0).getTime()
        );
    }

    return vacations;
};