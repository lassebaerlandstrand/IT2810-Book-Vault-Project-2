import { SVGProps } from 'react';
import { Group, GroupProps, Image, ImageProps } from '@mantine/core';
import BookVaultLogo from '../../assets/BookVaultLogo.png';
import BookVaultLogoWebP from '../../assets/BookVaultLogo.webp';
import BookVaultText from '../../assets/BookVaultText.svg?react';
import styles from './Logo.module.css';

export const LogoFull = (props: GroupProps) => {
  return (
    <>
      <Group component="figure" {...props} className={`${styles.wrapper} ${props.className ?? ''}`}>
        <Image src={BookVaultLogoWebP} fallbackSrc={BookVaultLogo} />
        <BookVaultText />
      </Group>
    </>
  );
};

export const LogoIcon = (props: ImageProps) => {
  return <Image src={BookVaultLogoWebP} fallbackSrc={BookVaultLogo} {...props} />;
};

export const LogoText = (props: SVGProps<SVGSVGElement>) => {
  return <BookVaultText {...props} />;
};
