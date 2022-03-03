#!/bin/bash
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`
echo "Running Image Installation"
echo "Checking python version"
python3 --version
echo "${green}Done${reset}"
sudo apt-get update
echo "Installing python3"
sudo apt-get install python3.8
echo "${green}Done${reset}"
sudo apt install python3-pip
echo "${green}Done${reset}"
echo "Checking pip version" 
pip3 --version
echo "${green}Done${reset}"
echo "${red}Big${reset} installation"
sudo apt-get install python3-pip build-essential git python3 python3-dev ffmpeg libsdl2-dev libsdl2-image-dev libsdl2-mixer-dev libsdl2-ttf-dev libportmidi-dev libswscale-dev libavformat-dev libavcodec-dev zlib1g-dev
echo "${green}Done${reset}"
sudo apt install geany -y
sudo apt-get update
sudo apt-get install neofetch
neofetch
sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
