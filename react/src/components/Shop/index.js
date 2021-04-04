import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import request from 'superagent'
import BuildPath from '../RequestBuilder'
import { Product } from './Product'
import { Cart } from '../Cart'
import Button from '@material-ui/core/Button'
import { CheckOut } from '../Cart/Checkout'
import { CheckStatus } from './CheckStatus'
import { Customize } from './Customize'

const useStyles = makeStyles(theme => ({
  container: {
    margin: '30px auto',
    justifyContent: 'center',
    textAlign: 'center'
  },
  gridRoot: {
    flexGrow: 1
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '20px'
  },
  button: {
    backgroundColor: '#66ccff'
  }
}))

const Shop = () => {
  // retrieve all from database
  const [cart, setCart] = useState([])
  const [productList, setProductList] = useState([])
  const [open, setOpen] = React.useState(false)
  const [openCheckout, setOpenCheckout] = React.useState(false)
  const [openCheckStatus, setOpenCheckStatus] = React.useState(false)
  const [openCustomize, setOpenCustomize] = React.useState(false)

  const handleAdd = product => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]['product']['productid'] === product['productid']) {
        let temp = [...cart]
        temp[i]['count'] = cart.splice(i, 1)[0]['count'] + 1
        setCart([...temp])
        return
      }
    }
    setCart([{ product: product, count: 1 }, ...cart])
  }

  const handleRemove = (item, mode) => {
    let index = cart.indexOf(item['product'])
    let temp = [...cart]
    if (mode === 'all') {
      temp.splice(index, 1)
      setCart([...temp])
    } else {
      let removeItem = temp.splice(index, 1)
      if (removeItem[0]['count'] - 1 === 0) {
        setCart([...temp])
      } else {
        removeItem[0]['count'] -= 1
        temp = [...temp, removeItem[0]]
        setCart([...temp])
      }
    }
  }

  const handleIncrement = cartItem => {
    handleAdd(cartItem['product'])
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseCheckOut = () => {
    setOpenCheckout(false)
  }

  const handleCheckOut = () => {
    handleClose()
    if (cart.length !== 0) {
      setOpenCheckout(true)
    }
  }

  const getProducts = () => {
    request
      .get(BuildPath('/customer/allProduct'))
      .set('Authorization', localStorage.getItem('Authorization'))
      .set('Accept', 'application/json')
      .then(res => {
        if (res.status === 200) {
          var prolist = JSON.stringify(res.body)
          if (JSON.stringify(productList) !== prolist) {
            setProductList(res.body)
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getProducts()
  })

  useEffect(() => {
    console.log(cart)
  }, [cart])

  const classes = useStyles()

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item md={4}>
          <Button
            onClick={() => setOpenCustomize(true)}
            className={classes.button}
          >
            Customize Order
          </Button>
        </Grid>
        <Grid item md={4}>
          <Button onClick={() => setOpen(true)} className={classes.button}>
            Cart ({cart.length})
          </Button>
        </Grid>
        <Grid item md={4}>
          <Button
            onClick={() => setOpenCheckStatus(true)}
            className={classes.button}
          >
            Tracking Order
          </Button>
        </Grid>
      </Grid>

      <Grid container className={classes.wrapper} spacing={2}>
        {productList.map(row => {
          return (
            <Product
              product={row}
              handleAdd={handleAdd}
              role={'customer'}
            ></Product>
          )
        })}
      </Grid>
      <Cart
        open={open}
        handleClose={handleClose}
        cartList={cart}
        handleIncrement={handleIncrement}
        handleCheckOut={handleCheckOut}
        handleRemove={handleRemove}
      />
      <CheckOut
        openCheckOut={openCheckout}
        handleCloseCheckOut={handleCloseCheckOut}
        cartList={cart}
        setCartList={setCart}
      />
      <CheckStatus
        openCheckStatus={openCheckStatus}
        setOpenCheckStatus={setOpenCheckStatus}
        productList={productList}
      />
      <Customize
        openCustomize={openCustomize}
        setOpenCustomize={setOpenCustomize}
        handleAdd={handleAdd}
      />
    </>
  )
}
export { Shop }
