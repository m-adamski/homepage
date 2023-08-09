type Photo = {
    url: string,
    blurHash: string,
    location: string | null,
    author: {
        name: string,
        portfolioUrl: string
    }
}

export { type Photo };
