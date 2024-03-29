import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { IListingParams } from "@/app/functions/getListings";
import getCurrentUser from "@/app/functions/getCurrentUser";
import RecommendationsSection from "@/app/components/sections/RecomendationsSection";

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      {currentUser && <RecommendationsSection currentUser={currentUser} />}
      <hr />
      <div
        className="
            pt-10
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            gap-x-6
            gap-y-10
          "
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
