import { ID } from 'appwrite';
import { databases, config } from '@/lib/appwrite';

export interface RatingData {
  rating: number;
  description: string;
}

export interface BugReportData {
  description: string;
}

export const feedbackService = {
  /**
   * Submit a rating to Appwrite
   */
  async submitRating(data: RatingData) {
    try {
      const document = await databases.createDocument(
        config.databaseId,
        config.ratingsCollectionId,
        ID.unique(),
        {
          userId: 'anonymous',
          userName: 'Anonymous User',
          userEmail: 'anonymous@obelix.com',
          rating: data.rating,
          description: data.description,
          status: 'new',
        }
      );
      return { success: true, data: document };
    } catch (error: any) {
      console.error('Error submitting rating:', error);
      return {
        success: false,
        error: error.message || 'Gagal mengirim rating. Silakan coba lagi.',
      };
    }
  },

  /**
   * Submit a bug report to Appwrite
   */
  async submitBugReport(data: BugReportData) {
    try {
      const document = await databases.createDocument(
        config.databaseId,
        config.bugReportsCollectionId,
        ID.unique(),
        {
          userId: 'anonymous',
          userName: 'Anonymous User',
          userEmail: 'anonymous@obelix.com',
          title: 'Bug Report dari Chatbot',
          description: data.description,
          priority: 'medium',
          status: 'open',
        }
      );
      return { success: true, data: document };
    } catch (error: any) {
      console.error('Error submitting bug report:', error);
      return {
        success: false,
        error: error.message || 'Gagal mengirim laporan bug. Silakan coba lagi.',
      };
    }
  },
};
