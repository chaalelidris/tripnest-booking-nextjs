
import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/functions/getCurrentUser";
import CommonLayout from "../components/containers/CommonLayout";
import Container from "../components/Container";
import AccountPass from "../components/profile/AccountPass";


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
                <AccountPass />
            </CommonLayout>
        </Container>

    );
}

export default ProfilePage;
