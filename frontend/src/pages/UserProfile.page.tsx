import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Container, Input, Stack, Text, Title } from '@mantine/core';
import { useUser } from '@/contexts/UserFunctions';
import { Review } from '@/generated/graphql';
import { useYourBookReviews } from '@/hooks/useYourBookReviews';
import ReviewStack from '../components/ReviewStack/ReviewStack';
import styles from './Profile.module.css';

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
    <Container size="sm" my="xl" className={styles.profileContainer}>
      <Stack>
        <Avatar size={100} radius="xl" className={styles.avatar}>
          {newName
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </Avatar>
        <Text ta="center" size="lg" className={styles.userName}>
          {info.name}
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
              <Link to="/myReviews" className={styles.viewMoreLink}>
                <Button fullWidth radius="md" variant="outline">
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
