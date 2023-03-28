import { Card } from '@mui/material';
import { Box, styled } from '@mui/system';

const CardRoot = styled(Card)(() => ({
  height: '50%',
  padding: '20px 24px',
}));

const CardTitle = styled('div')(({ subtitle }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
  marginBottom: !subtitle && '14px',
}));

const SimpleCard = ({ children, title, subtitle, icon }) => {
  return (
    <CardRoot elevation={4}>
      <CardTitle subtitle={subtitle}>{title}</CardTitle>
      {subtitle && <Box sx={{ mb: 2 }}>{subtitle}</Box>}
      {children}
    </CardRoot>
  );
};

export default SimpleCard;
