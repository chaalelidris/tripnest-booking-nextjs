
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import ProfileClient from "./ProfileClient";



export const metadata = {
    title: 'User profile | Tripnest ',
    description: 'Tripnest booking user profile',
}

const ProfilePage = async () => {
    const currentUser = await getCurrentUser();


    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }


    
    return (
        <ClientOnly>
            <ProfileClient
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default ProfilePage;
