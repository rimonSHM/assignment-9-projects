


export const fetchCourses = async (params = {}) => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/tutors`;
    const queryParams = new URLSearchParams();

    // params যদি String হয় (যেমন শুধু নাম পাঠানো হলো)
    if (typeof params === "string" && params.trim() !== "") {
      queryParams.append("searchTerm", params.trim());
    } 
    // params যদি Object হয় ({ searchTerm, startDate, endDate })
    else if (typeof params === "object" && params !== null) {
      if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm.trim());
      if (params.startDate) queryParams.append("startDate", params.startDate);
      if (params.endDate) queryParams.append("endDate", params.endDate);
    }

    const queryString = queryParams.toString();
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API response status:", res.status);
      return [];
    }

    const data = await res.json();

    if (Array.isArray(data)) return data;
    return data.data || data.tutors || data.courses || [];
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return [];
  }
};

// =====================================================
// FETCH FEATURED TUTORS (LIMIT 6)
// =====================================================
export const fetchFeaturedCourses = async () => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    
    const res = await fetch(`${API_URL}/tutors`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Featured Tutors API response status:", res.status);
      return [];
    }

    const data = await res.json();

    const tutorsList = Array.isArray(data)
      ? data
      : data.data || data.tutors || [];

    return tutorsList.slice(0, 6);
  } catch (error) {
    console.error("Error fetching featured tutors:", error);
    return [];
  }
};