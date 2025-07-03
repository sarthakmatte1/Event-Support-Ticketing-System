import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Chip,
  Box 
} from '@mui/material';

export default function TicketDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`/api/tickets/${id}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setTicket(res.data);
      } catch (err) {
        console.error(err);
        navigate('/tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, navigate]);

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await axios.patch(
        `/api/tickets/${id}`,
        { status: newStatus },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      setTicket(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!ticket) return <Typography>Ticket not found</Typography>;

  return (
    <Container maxWidth="md">
      <Button 
        variant="outlined" 
        onClick={() => navigate('/tickets')}
        sx={{ mb: 2 }}
      >
        Back to Tickets
      </Button>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h4">{ticket.title}</Typography>
            <Chip 
              label={ticket.status} 
              color={
                ticket.status === 'resolved' ? 'success' : 
                ticket.status === 'in-progress' ? 'warning' : 'primary'
              }
            />
          </Box>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Category: {ticket.category} | Severity: {ticket.severity}
          </Typography>

          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            {ticket.description}
          </Typography>

          <Typography variant="caption" display="block" sx={{ mt: 2 }}>
            Created: {new Date(ticket.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="caption" display="block">
            Last Updated: {new Date(ticket.updatedAt).toLocaleString()}
          </Typography>

          {user?.role === 'admin' && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Admin Actions</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                {['open', 'in-progress', 'resolved'].map((status) => (
                  <Button
                    key={status}
                    variant={ticket.status === status ? 'contained' : 'outlined'}
                    onClick={() => handleStatusChange(status)}
                    disabled={ticket.status === status}
                  >
                    Mark as {status}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}