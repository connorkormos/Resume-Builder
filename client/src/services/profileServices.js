import { fetchApi } from "@/lib/fetch";

export const getUserProfiles = async () => {
   try {
      const data = await fetchApi({
         endpoint: '/profiles/',
         options: {
            method: 'GET'
         }
      })

      return data;

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



export const createUserProfile = async (profileTitle) => {
   try {
      const data = await fetchApi({
         endpoint: '/profiles/',
         options: {
            method: 'POST',
            body: JSON.stringify({ title: profileTitle }),
            headers: {
               'Content-Type': 'application/json'
            }
         }
      });

      return data;

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