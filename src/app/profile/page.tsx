
import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/functions/getCurrentUser";
import ProfileClient from "./ProfileClient";
import CommonLayout from "../components/containers/CommonLayout";
import Container from "../components/Container";


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
        <Container>
            <CommonLayout>
                <ProfileClient
                    currentUser={currentUser}
                />
            </CommonLayout>
        </Container>

    );
}

export default ProfilePage;
