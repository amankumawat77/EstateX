import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import AllOrders from "../../src/components/dashboard/AllOrders";
import Head from 'next/head';
import Order from '../../models/Order';
import mongoose from "mongoose";

const Orders = ({orders}) => {

  return (
    <><Head><title>{'Admin -- View All Inquiries'}</title></Head>
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
            <AllOrders orders={orders}/>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI is not defined.");
      return { props: { orders: [] } };
    }
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
          serverSelectionTimeoutMS: 5000
      })
    }
    let orders = await Order.find()
    return {
        props: { orders: JSON.parse(JSON.stringify(orders)) }
    }
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return {
        props: { orders: [] }
    }
  }
}

export default Orders