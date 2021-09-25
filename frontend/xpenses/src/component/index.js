import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import {BrowserRouter as Router, Link, Route, Switch, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { makeStyles } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { Card } from '@material-ui/core';
import NavBar from "./Navbar"
import {
    PieSeries,
    Chart,
    Title,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
    BarSeries
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart'

export {
    Animation,
    AppBar,
    ArgumentAxis,
    Avatar,
    BarSeries,
    Box,
    Button,
    Card,
    Chart,
    Checkbox,
    Container,
    CssBaseline,
    FormControl,
    FormLabel,
    Grid,
    LineSeries,
    Link,
    makeStyles,
    Paper,
    PieSeries,
    Radio,
    RadioGroup,
    React,
    Route,
    Router,
    Snackbar,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Title,
    Typography,
    ToolBar,
    NavBar,
    useDispatch,
    useEffect,
    useHistory,
    useState,
    useSelector,
    ValueAxis
}