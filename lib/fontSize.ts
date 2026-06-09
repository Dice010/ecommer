type FontSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "sub";

export function getFontSize(size: FontSize): string {
    switch (size){
        case "h1":
            return "clamp(2rem, 4vw, 3rem)";
        case "h2":
            return "clamp(1.5rem, 3vw, 2.5rem)";
        case "h3":
            return "clamp(1.25rem, 2.5vw, 2rem)";
        case "h4":
            return "clamp(1.125rem, 2vw, 1.5rem)";
        case "h5":
            return "clamp(1rem, 1.5vw, 1.25rem)";
        case "h6":
            return "clamp(0.875rem, 1.25vw, 1.125rem)";
        case "p":
            return "clamp(0.875rem, 1.25vw, 1rem)";
        case "sub":
            return "clamp(0.75rem, 1vw, 0.875rem)";
    }
}