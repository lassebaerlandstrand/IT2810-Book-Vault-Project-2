import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Container, Divider, Stack, Text, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useUser } from '@/contexts/UserFunctions';
import { Review } from '@/generated/graphql';
import { updateUser } from '@/hooks/updateUser';
import { useYourBookReviews } from '@/hooks/useYourBookReviews';
import { formatAvatarAbbreviation } from '@/utils/formatting';
import ReviewStack from '../components/ReviewStack/ReviewStack';
import styles from './UserProfile.module.css';

/**
 * ProfilePage component displays the user's profile information and allows editing the user's name.
 * It also shows a list of the user's recent book reviews.
 */
export function ProfilePage() {
  const { info, secret } = useUser();

  const [newName, setNewName] = useState(info.name || '');
  const [isEditing, setIsEditing] = useState(false);
  const [inputError, setInputError] = useState('');

  const { submitUpdate, success, message, loading: updateNameLoading } = updateUser();
  const { reviews, totalReviews, loading, error } = useYourBookReviews({
    limit: 3,
    page: 1,
    userUUID: info.UUID,
  });

  useEffect(() => {
    if (!updateNameLoading && message && typeof success === 'boolean') {
      notifications.show({
        title: success ? 'Success!' : 'Error!',
        message,
        color: success ? 'blue' : 'red',
        autoClose: 5000,
      });
    }
  }, [message, success, updateNameLoading]);

  useEffect(() => {
    setNewName(info.name || '');
  }, [info.name]);

  const handleNameChange = () => {
    if (newName.length < 2) {
      setInputError(`Name must be at least 2 characters, the current length is ${newName.length}`);
      return;
    }
    if (newName.length > 50) {
      setInputError(
        `Name must be less than 50 characters, the current length is ${newName.length}`
      );
      return;
    }
    submitUpdate({ name: newName, UUID: info.UUID, secret });
    setIsEditing(false);
    setInputError('');
  };

  return (
    <Container size="sm" my="xl">
      <Stack align="center">
        <Avatar size={100} radius="xl">
          {formatAvatarAbbreviation(newName)}
        </Avatar>
        <Text ta="center" size="lg" mt="sm">
          {info.name}
        </Text>

        {isEditing ? (
          <>
            <TextInput
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="Enter new name"
              label="Name"
              autoFocus
              mb="md"
              error={inputError}
              w="75%"
            />
            <Button w="75%" radius="md" onClick={handleNameChange} mt="md">
              Save
            </Button>
          </>
        ) : (
          <Button
            w="75%"
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
          Your library
        </Title>

        <Title order={3} mt="md" fw={500}>
          Books you want to read
        </Title>

        <Title order={3} mt="md" fw={500}>
          Books you have read
        </Title>

        <Divider />

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
            {totalReviews && totalReviews > 3 && (
              <Link to="/myReviews" className={styles.link}>
                <Button fullWidth radius="md" mt="md">
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
