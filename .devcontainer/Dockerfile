# We'll base our dev container image on Alpine Linux.
FROM alpine:3.15

# Then we'll add the dependencies we need:
# - musl, libgcc, and libstdc++ are required by VS Code's server
# - git and gnupg are useful for remote development so that we
#   can commit and sign commits from within the container
# - and of course nginx itself
RUN apk add \
  musl \
  libgcc \
  libstdc++ \
  git \
  gnupg \
  nginx

# Finally, we'll remove nginx's default content and replace it
# with a symlink to our source code.

RUN rm -rf /usr/share/nginx/html
RUN ln -s /src/public /usr/share/nginx/html