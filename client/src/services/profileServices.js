import { fetchApi } from "@/lib/fetch";

export const addProfileSubsectionToApi = async (sectionId) => {
   try {
      return await fetchApi({
         endpoint: `/profiles/sections/${sectionId}/subsections`,
         options: { method: 'POST' },
      });
   } catch (error) {
      console.error('Error adding profile subsection: ', error);
      return null;
   }
};

export const updateProfileFieldsInApi = async (profileId, fields, title) => {
   try {
      return await fetchApi({
         endpoint: `/profiles/${profileId}/fields`,
         options: {
            method: 'PATCH',
            body: JSON.stringify({ fields, ...(title !== undefined ? { title } : {}) }),
         },
      });
   } catch (error) {
      console.error('Error updating profile fields: ', error);
      return null;
   }
};

export const getUserProfiles = async () => {
   try {
      const responseData = await fetchApi({
         endpoint: '/profiles/',
         options: {
            method: 'GET'
         }
      })

      return responseData;

   } catch (error) {
      console.error('Error fetching user profiles: ', error);
      alert(
         error?.code && error?.message
         ? error.code + '\n' + error.message
         : 'Error fetching user profiles.'
      )

      return null;
   }
}

export const getUserProfile = async (profileId) => {
   try {
      const responseData = await fetchApi({
         endpoint: `/profiles/${profileId}`,
         options: {
            method: 'GET'
         }
      });

      return responseData;

   } catch (error) {
      console.error('Error fetching user profile: ', error);
      alert(
         error?.code && error?.message
         ? error.code + '\n' + error.message
         : 'Error fetching user profile.'
      );

      return null;
   }
};

export const createUserProfile = async (profileTitle) => {
   try {
      const responseData = await fetchApi({
         endpoint: '/profiles/',
         options: {
            method: 'POST',
            body: JSON.stringify({ title: profileTitle }),
            headers: {
               'Content-Type': 'application/json'
            }
         }
      });

      return responseData;

   } catch (error) {
      console.error('Error creating user profile: ', error);
      alert(
         error?.code && error?.message
         ? error.code + '\n' + error.message
         : 'Error creating user profile.'
      );

      return null;
   }
};

export const deleteUserProfile = async (profileId) => {
   try {
      const responseData = await fetchApi({
         endpoint: `/profiles/${profileId}`,
         options: {
            method: 'DELETE'
         }
      });

      return responseData;

   } catch (error) {
      console.error('Error deleting user profile: ', error);
      alert(
         error?.code && error?.message
         ? error.code + '\n' + error.message
         : 'Error deleting user profile.'
      );

      return null;
   }
};

export const getAvailableProfileSectionsFromApi = async (profileId) => {
   try {
      const availableSectionData = await fetchApi({
         endpoint: `/profiles/sections/${profileId}/available`,
         options: {
            method: 'GET'
         }
      });

      return availableSectionData;

   } catch (error) {
      console.error('Error fetching available profile sections: ', error);
      alert(
         error?.code && error?.message
         ? error.code + '\n' + error.message
         : 'Error fetching available profile sections.'
      );

      return null;
   }
};

export const addProfileSectionToApi = async (profileId, sectionType) => {
   try {
      const responseData = await fetchApi({
         endpoint: `/profiles/sections/${profileId}`,
         options: {
            method: 'POST',
            body: JSON.stringify({ type: sectionType }),
            headers: {
               'Content-Type': 'application/json'
            }
         }
      });

      return responseData;

   } catch (error) {
      console.error('Error adding profile section: ', error);
      alert(
         error?.code && error?.message
         ? error.code + '\n' + error.message
         : 'Error adding profile section.'
      );

      return null;
   }
};
