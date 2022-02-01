(
  cd frontend && \
  yarn install && \
  yarn build:ui
) && \
(
  cd backend && \
  yarn up 
)