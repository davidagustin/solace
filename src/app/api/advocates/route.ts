import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';

  // Use database if configured, otherwise use static data
  let data = advocateData;
  
  if (db) {
    try {
      // Uncomment this line to use a database
      // data = await db.select().from(advocates);
    } catch (error) {
      console.error("Database error:", error);
      // Fall back to static data
    }
  }

  // Apply search filter on server side
  if (search) {
    data = data.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(search) ||
        advocate.lastName.toLowerCase().includes(search) ||
        advocate.city.toLowerCase().includes(search) ||
        advocate.degree.toLowerCase().includes(search) ||
        advocate.specialties.some(specialty => 
          specialty.toLowerCase().includes(search)
        ) ||
        advocate.yearsOfExperience.toString().includes(search)
      );
    });
  }

  return Response.json({ 
    data,
    total: data.length,
    search: search || null
  });
}
