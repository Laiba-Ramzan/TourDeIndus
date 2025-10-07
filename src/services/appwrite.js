import { Client, Databases, Storage, ID } from "appwrite";
import conf from "../conf/conf";

class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  async createBookings(bookingData) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookingsId,
        ID.unique(),
        bookingData
      );
      return response;
    } catch (error) {
      console.error(" Error creating booking:", error);
      throw error;
    }
  }

  async getBookings() {
    return this.listDocuments(conf.appwriteBookingsId);
  }

  async deleteBooking(bookingId) {
    try {
      const res = await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookingsId,
        bookingId
      );
      
      return res;
    } catch (error) {
      console.error(" Error deleting booking:", error);
      throw error;
    }
  }

  async listDocuments(collectionId) {
    try {
      const res = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        collectionId
      );
      return res;
    } catch (error) {
      console.error(` Error fetching from ${collectionId}:`, error);
      return { documents: [] };
    }
  }

  async getDestinations() {
    return this.listDocuments(conf.appwriteDestinationsId);
  }
  async getResorts() {
    return this.listDocuments(conf.appwriteResortsId);
  }
  async getPackages() {
    return this.listDocuments(conf.appwritePackagesId);
  }
  async getContactRequests() {
    return this.listDocuments(conf.appwriteContactRequestId);
  }

  async createContactRequest(contactData) {
    try {
      const res = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteContactRequestId,
        ID.unique(),
        contactData
      );
      return res;
    } catch (error) {
      console.error(" Error creating contact request:", error);
      throw error;
    }
  }

  getFileUrl(fileId) {
    if (!fileId) return "https://via.placeholder.com/300";
    try {
      if (typeof fileId === "string") {
        fileId = fileId.replace(/["[\]]/g, "").trim();
        if (fileId.includes(",")) fileId = fileId.split(",")[0].trim();
      }
      if (Array.isArray(fileId)) fileId = fileId[0];
    } catch (err) {
      console.warn(" FileId parsing failed:", err);
      return "https://via.placeholder.com/300";
    }
    return `${conf.appwriteUrl}/storage/buckets/${conf.appwriteStorageId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
  }
}

const service = new Service();
export default service;
