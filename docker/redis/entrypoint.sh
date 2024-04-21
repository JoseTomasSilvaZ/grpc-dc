#!/bin/sh

sleep 5
echo "yes" | redis-cli --cluster create \
  173.18.0.10:6379 \
  173.18.0.11:6379 \
  173.18.0.12:6379 \
  --cluster-replicas 0
echo "🚀 Redis cluster ready."