
import { Client, Databases, ID, Query, Storage } from "appwrite"
import conf from "../conf/conf";


export class Service {

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, content, featuredImage, slug, userID, status }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userID,
                    status

                }
            )
        } catch (error) {
            throw error
        }

    }

    // using slug user can be recognized  slug === documentID
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error
        }

    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseid, conf.appwriteCollectionid, slug)
            return true
        } catch (error) {
            throw error

        }

    }
    // get All posts of single ID
    async getPost(slug) {
        try {
            return this.databases.getDocument(conf.appwriteBucketid, conf.appwriteCollectionid, slug)
        } catch (error) {
            throw error
        }
    }

    // so for getting list of posts that are active , Appwrite don't have inbuild function for that we have to use custome qurries 
    // Many list endpoints in Appwrite allow you to filter, sort, and paginate results using queries.
    // we can write qurries only if we will have "indexs" in our databases. here we have (index === status)
    // here we will fetch that post which would have status active
    async getPosts(querry = [
        Query.equal("status", "active")
    ]) {
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                querry
            )

        } catch (error) {
            throw error
        }
    }



    // file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketid,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketid,
            fileId
        )
    }
}

const databaseService = Service()
export default databaseService