import axiosInstance from "@/app/utils/RefeshTokenHandler";
import { AccessStored } from "@/app/utils/TokenStore";


export const Logout = {
    async logout(access :string) {
        try {
            // Gọi API logout để xóa refresh token từ server
            console.log(access)

            const response = await axiosInstance.post('http://localhost:8080/blacklist/logout', {
                accesstoken: access
            });

             
            console.log(response)
            // Xóa access token khỏi memory
            AccessStored.clear();

        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
};
