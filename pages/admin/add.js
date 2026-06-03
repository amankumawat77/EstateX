import React, { useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Head from 'next/head';

const Add = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState('')
  const [price, setPrice] = useState('')
  const [availableQty, setAvailableQty] = useState('')
  const onchange = (e) => {
    if (e.target.name == 'title') {
      setTitle(e.target.value)
    }
    else if (e.target.name == 'slug') {
      setSlug(e.target.value)
    }
    else if (e.target.name == 'description') {
      setDescription(e.target.value)
    }
    else if (e.target.name == 'price') {
      setPrice(e.target.value)
    }
    else if (e.target.name == 'availableQty') {
      setAvailableQty(e.target.value)
    }
    else if (e.target.name == 'image') {
      setImg(e.target.value)
    }
  }
  const submitForm = async (e) => {
    e.preventDefault()
    const data = { title: title, slug: slug, desc: description, img: img, price: price, availableQty: availableQty }
    let res = await fetch('/api/addproducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    if (response.succses) {
      toast.success('Property added successfully!', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Failed to add property: ' + (response.error || 'Unknown error'), {
        position: "top-left",
        autoClose: 5000,
      });
    }
  }

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <Head><title>{'Admin -- Add a New Product'}</title></Head>
      <ThemeProvider theme={theme}>
        <style jsx global>{`
            footer {
            display: none;
            }
            header {
              display: none;
              }
      `}</style>
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Add a New Property">
                <Stack spacing={3}>
                  <TextField onChange={onchange} value={title} name="title" label="Property Title" variant="outlined" />
                  <TextField onChange={onchange} value={slug} name="slug" label="URL Slug" variant="outlined" />
                  <TextField onChange={onchange} value={description} name="description" label="Property Description" multiline rows={4} />
                  <TextField onChange={onchange} value={img} name="image" label="Image URL" variant="outlined" />
                  <TextField onChange={onchange} value={price} name="price" label="Asking Price (₹)" variant="outlined" type="number" />
                  <TextField onChange={onchange} value={availableQty} name="availableQty" label="Number of Plots Available" variant="outlined" type="number" />
                </Stack>
                <br />
                <Button onClick={submitForm} variant="contained" mt={2}>
                  Add Property
                </Button>
              </BaseCard>
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
}

export default Add