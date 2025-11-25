export const getImageUrl = (path: string, domain: string = 'https://img.ophim.live') => {
    return `${domain}/uploads/movies/${path}`
}


export const getTMDBImageUrl = (path: string, type: 'original' | 'w1280' | 'w780' | 'w300' = 'original') => {
    return `https://image.tmdb.org/t/p/${type}/${path}`
}