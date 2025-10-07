const conf={
  appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteDestinationsId:String(import.meta.env.VITE_APPWRITE_DESTINATIONS_COLLECTION_ID),
  appwriteResortsId:String(import.meta.env.VITE_APPWRITE_RESORTS_COLLECTION_ID),
  appwriteBookingsId:String(import.meta.env.VITE_APPWRITE_BOOKINGS_COLLECTION_ID),
  appwritePackagesId:String(import.meta.env.VITE_APPWRITE_PACKAGES_COLLECTION_ID),
  appwriteContactRequestId:String(import.meta.env.VITE_APPWRITE_CONTACTREQUESTS_COLLECTION_ID), 
  appwriteStorageId:String(import.meta.env.VITE_APPWRITE_STORAGE_ID)   
}
export default conf