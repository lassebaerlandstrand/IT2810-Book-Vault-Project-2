import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Container, Input, Stack, Text, Title } from '@mantine/core';
import { useUser } from '@/contexts/UserFunctions';
import { Review } from '@/generated/graphql';
import { useYourBookReviews } from '@/hooks/useYourBookReviews';
import ReviewStack from '../components/ReviewStack/ReviewStack';

/**
 * ProfilePage component displays the user's profile information and allows editing the user's name.
 * It also shows a list of the user's recent book reviews.
 */
export function ProfilePage() {
  const { info, setUser } = useUser();
  const [newName, setNewName] = useState(info.name || '');
  const [isEditing, setIsEditing] = useState(false);

  const { reviews, loading, error } = useYourBookReviews({
    limit: 3,
    page: 1,
    userUUID: info.UUID,
  });

  useEffect(() => {
    setNewName(info.name || '');
  }, [info.name]);

  const handleNameChange = () => {
    if (newName.trim()) {
      setUser({ ...info, name: newName });
      setIsEditing(false);
    }
  };

  return (
    <Container size="sm" my="xl">
      <Stack align="center">
        <Avatar size={100} radius="xl">
          {newName
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </Avatar>
        <Text ta="center" size="lg" mt="sm">
          {info.name}
        </Text>

        {isEditing ? (
          <>
            <Input
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="Enter new name"
              autoFocus
              mb="md"
            />
            <Button fullWidth radius="md" onClick={handleNameChange} mt="md">
              Save
            </Button>
          </>
        ) : (
          <Button
            fullWidth
            radius="md"
            size="md"
            variant="default"
            onClick={() => setIsEditing(true)}
            mt="md"
          >
            Edit Name
          </Button>
        )}

        <Title order={2} mt="lg">
          Your Reviews
        </Title>
        {loading ? (
          <Text ta="center">Loading reviews...</Text>
        ) : error ? (
          <Text ta="center" c="red">
            Error fetching reviews
          </Text>
        ) : (
          <>
            <ReviewStack reviews={reviews as Review[]} type="bookReview" />
            {reviews && reviews.length >= 3 && (
              <Link to="/myReviews">
                <Button fullWidth radius="md" variant="outline" mt="md">
                  View All Reviews
                </Button>
              </Link>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
}

export default ProfilePage;
