import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  Font,
} from '@react-email/components';
import * as React from 'react';

interface EmailProps {
  magicLink?: string;
}

export const Email = ({ magicLink = 'https://raycast.com' }: EmailProps) => (
  <Html>
    <Head>
      <Font fontFamily='Verdana' fallbackFontFamily='Verdana' />
    </Head>
    <Tailwind>
      <Preview>Log in with this magic link.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading} className='text-red-500'>
            🪄 Your magic link
          </Heading>
          <Section
            style={body}
            className='bg-[#F9F9F9] px-5 rounded-lg text-gray-700'
          >
            <Text style={paragraph}>
              <Link href={magicLink} className='text-red-500'>
                👉 Click here to sign in 👈
              </Link>
            </Text>
            <Text style={paragraph}>
              If you didn't request this, please ignore this email.
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />- Firebase dev Team
          </Text>
          <Hr style={hr} />

          <Text style={footer}>
            You are receiving this email because you requested to login via
            magic link from our{' '}
            <Link
              href='https://raycast.com'
              className='underline text-gray-400 text-inherit focus:text-gray-400 outline-none '
            >
              website
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default Email;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 10px 48px',
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat, no-repeat',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const body = {
  margin: '24px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginLeft: '4px',
};
