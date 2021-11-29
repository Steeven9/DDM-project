{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  nativeBuildInputs = [
    pkgs.buildPackages.mongodb-4_2
    pkgs.buildPackages.nodejs-16_x
  ];
}
