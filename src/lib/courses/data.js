 export const fetchCourses= async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
    const data = await res.json();
    return data || [];
}




 export const fetchFeaturedCourses= async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`);
    const data = await res.json();
    return data || [];
}




