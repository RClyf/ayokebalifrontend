import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Stack,
  VStack,
  HStack,
  useColorModeValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Text,
  Badge,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Links = [ 'Home','Itinerary', 'Loan'];

const NavLink = ({ children }) => (
  <Button as={Link} to={'#'}>
    {children}
  </Button>
);

const EditDestination = () => {
    const { id } = useParams();
    const username = sessionStorage.getItem('username');
    const storedToken1 = sessionStorage.getItem('token1');
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [formData, setFormData] = useState({
      destination_id: 0,
      name: '',
      category: '',
      location: '',
      latitude: 0.0,
      longitude: 0.0,
      perkiraan_biaya: 0,
    });

    useEffect(() => {
        // Ambil data destinasi berdasarkan ID dari API saat komponen dipasang
        if (storedToken1 && id) {
          axios.get(`https://ayokebalitst.azurewebsites.net/destination/${id}`, {
            headers: {
              Authorization: `Bearer ${storedToken1}` // Menyertakan token dalam header Authorization
            }
          })
            .then(response => {
              setFormData(response.data);
            })
            .catch(error => {
              console.error('Error fetching destination details:', error);
            });
        }
      }, [id, storedToken1]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        'https://ayokebalitst.azurewebsites.net/destination',
        {
          destination_id: formData.destination_id,
          name: formData.name,
          category: formData.category,
          location: formData.location,
          latitude: formData.latitude,
          longitude: formData.longitude,
          perkiraan_biaya: formData.perkiraan_biaya,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken1}`,
            'Content-Type': 'application/json', // Set Content-Type header to application/json
          },
        }
      );
      // Handle redirect or other actions after successful submission
    } catch (error) {
      console.error('Error submitting itinerary:', error);
    }
    window.location.href = '/home';
  };

  const SignOut = () => {
    sessionStorage.setItem('token1', '');
    sessionStorage.setItem('token2', '');
  };

  return (
    <Box>
      <Box bg={useColorModeValue('teal.200', 'teal.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={<HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Box>Ayo Ke Bali</Box>
              <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <Button bg={'teal.200'} key={link} as={Link} to={`/${link.toLowerCase()}`} variant="ghost">
                    {link}
                  </Button>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                </MenuButton>
                <MenuList>
                  <Text>Hello, {username}</Text>
                  <MenuDivider />
                  <Link to="/" onClick={SignOut}>Sign Out</Link>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link} to={`/${link.toLowerCase()}`}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      <Heading mb={4} mt={4} >Edit Data Destinasi</Heading>
      <Box mx={10}>
        <form onSubmit={handleSubmit} >
          <VStack align="start">
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Destinasi"
              />
            </FormControl>

            <FormControl id="category" isRequired>
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Nama Kategori"
              />
            </FormControl>

            <FormControl id="location" isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Lokasi Destinasi"
              />
            </FormControl>

            <FormControl id="latitude" isRequired>
              <FormLabel>Latitude</FormLabel>
              <Input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Format dalam X.XXXX"
              />
            </FormControl>

            <FormControl id="longitude" isRequired>
              <FormLabel>Longitude</FormLabel>
              <Input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Format dalam X.XXXX"
              />
            </FormControl>

            <FormControl id="perkiraan_biaya" isRequired>
              <FormLabel>Perkiraan Biaya</FormLabel>
              <Input
                type="number"
                name="perkiraan_biaya"
                value={formData.perkiraan_biaya}
                onChange={handleChange}
                placeholder="Format dalam Rupiah"
              />
            </FormControl>

            <Button type="submit" bg="teal.200" mt={4} mx="auto">
              Ubah
            </Button>
          </VStack>
        </form>
        </Box>
    </Box>
  );
};

export default EditDestination;
