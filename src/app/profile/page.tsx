
import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/functions/getCurrentUser";
import ProfileClient from "./ProfileClient";


export const metadata = {
    title: 'User profile | Tripnest ',
    description: 'Tripnest booking user profile',
}

const ProfilePage = async () => {
    const currentUser = await getCurrentUser();


    if (!currentUser) {
        return (
            
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            
        )
    }



    return (
        
            <ProfileClient
                currentUser={currentUser}
            />
        
    );
}

export default ProfilePage;
