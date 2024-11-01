import { useEffect, useState } from 'react';
import { Avatar, Button, Container, Grid, Input, Text, Title } from '@mantine/core';
import { useUser } from '@/contexts/UserContext';
import { useYourBookReviews } from '@/hooks/useYourBookReviews'; // Ensure the path is correct
import BookCard from '../components/BookCard/BookCard';
import styles from './Profile.module.css';

export function ProfilePage() {
  const { user, setUser } = useUser();
  const [newName, setNewName] = useState(user.name || '');
  const [isEditing, setIsEditing] = useState(false);

  const { reviews, loading, error } = useYourBookReviews({
    limit: 5, // Fetch a limited number of reviews, can be adjusted
    page: 1,
    userUUID: user.UUID,
  });

  useEffect(() => {
    setNewName(user.name || '');
  }, [user.name]);

  const handleNameChange = () => {
    if (newName.trim()) {
      setUser({ ...user, name: newName });
      setIsEditing(false);
    }
  };

  return (
    <Container size="sm" my="xl" className={styles.profileContainer}>
      <Avatar size={80} radius="xl" className={styles.avatar}>
        {newName
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </Avatar>
      <Text align="center" size="lg" weight={500} className={styles.userName}>
        {user.name}
      </Text>

      {isEditing ? (
        <>
          <Input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="Enter new name"
            className={styles.input}
            autoFocus
          />
          <Button fullWidth radius="md" onClick={handleNameChange} className={styles.saveButton}>
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
          className={styles.editButton}
        >
          Edit Name
        </Button>
      )}

      <Title order={2} className={styles.sectionTitle}>
        Your Reviews
      </Title>
      <Grid gutter="md" className={styles.gridContainer}>
        {loading && <Text align="center">Loading reviews...</Text>}
        {error && (
          <Text align="center" color="red">
            Error fetching reviews
          </Text>
        )}
        {reviews?.length
          ? reviews.map((review) => (
              <Grid.Col key={review.UUID} span={6}>
                <BookCard
                  book={{
                    id: review.book?.id || '',
                    title: review.book?.title || 'Unknown',
                    coverImg: review.book?.coverImg || '',
                    authors: review.book?.authors || [],
                    rating: review.book?.rating || 0,
                  }}
                  reviewContent={review.description}
                />
              </Grid.Col>
            ))
          : !loading && (
              <Text align="center" color="dimmed">
                No reviews available.
              </Text>
            )}
      </Grid>
    </Container>
  );
}

export default ProfilePage;
