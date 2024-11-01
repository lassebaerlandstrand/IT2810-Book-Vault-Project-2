import { useEffect, useState } from 'react';
import { Avatar, Button, Container, Input, Text, Title } from '@mantine/core';
import { useUser } from '@/contexts/UserFunctions';
import { useYourBookReviews } from '@/hooks/useYourBookReviews';
import ReviewStack from '../components/ReviewStack/ReviewStack';
import styles from './Profile.module.css';

export function ProfilePage() {
  const { user, setUser } = useUser();
  const [newName, setNewName] = useState(user.name || '');
  const [isEditing, setIsEditing] = useState(false);

  const { reviews, loading, error } = useYourBookReviews({
    limit: 3,
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
      <Avatar size={100} radius="xl" className={styles.avatar}>
        {newName
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </Avatar>
      <Text align="center" size="lg" weight={600} className={styles.userName}>
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
      {loading ? (
        <Text align="center">Loading reviews...</Text>
      ) : error ? (
        <Text align="center" color="red">
          Error fetching reviews
        </Text>
      ) : (
        <ReviewStack reviews={reviews} type="yourReview" />
      )}
    </Container>
  );
}

export default ProfilePage;
